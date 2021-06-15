import { verifyMessage } from '@ethersproject/wallet'
import pinataSDK from '@pinata/sdk'
import imageType from 'image-type'
import { Readable } from 'stream'

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_API_SECRET!,
)

// Upload buffer to IPFS, return upload hash
export async function upload(file: Buffer, filename: string) {
  const stream = Readable.from(file)

  // Fixes upload issue: https://github.com/PinataCloud/Pinata-SDK/issues/28
  // ¡¡ THE HACK !!
  ;(stream as any).path = filename
  const r = await pinata.pinFileToIPFS(stream, {
    pinataOptions: {
      cidVersion: 0,
    },
  })
  // log.trace({tokenUri: r.IpfsHash}, `Completed ${r.PinSize} bytes for {tokenUri}`);
  return r.IpfsHash
}

// Upload a supported image type to IPFS, return hash
export async function uploadAvatar(avatar: Buffer, signature: string) {
  // First, validate we are uploading something that is probably right.
  if (!(await validateImage(avatar, signature))) return null
  return upload(avatar, 'avatar.jpg')
}

export async function validateImage(buffer: Buffer, signature: string) {
  // First, lets check the signature of this upload
  const address = verifyMessage(buffer, signature)
  // Ensure we leave behind a trace of who-uploaded-what?
  // log.debug({ address }, `Validating upload from {address}`);

  // Validate our input: lets not put sketchy data online under our name
  return await isValidImageType(buffer, address)
}

// Check the binary data is a supported image type.
async function isValidImageType(buffer: Buffer, address: string) {
  const res = imageType(buffer)
  if (
    res?.mime !== 'image/png' &&
    res?.mime !== 'image/webp' &&
    res?.mime !== 'image/jpg' &&
    res?.mime !== 'image/jpeg'
  ) {
    //   log.warn({ address }, `Rejected upload from {address} because an invalid type (${res?.mime}) was detected`);
    return false
  }
  return true
}
