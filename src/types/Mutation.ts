import { objectType } from 'nexus'
import { inviteUserConfig } from './mutations/inviteUser'
import { login } from './mutations/login'
import { resetPasswordConfig } from './mutations/resetPassword'
import { signup } from './mutations/signup'
import { createIPFSHash } from './mutations/createIPFSHash'
import { updateNFT } from './mutations/updateNFT'

export const Mutation = objectType({
  name: 'Mutation',
  definition: (t) => {
    t.field('inviteUser', inviteUserConfig)
    t.field('signup', signup)
    t.field('login', login)
    t.field('resetPassword', resetPasswordConfig)
    t.field('createIPFSHash', createIPFSHash)
    t.field('updateNFT', updateNFT)
  },
})
