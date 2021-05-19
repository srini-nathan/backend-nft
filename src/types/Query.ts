import { objectType } from "nexus";
import { getAllUserResolver } from "./queries/admin/getAllUser";
import { me } from "./queries/meQuery";

export const Query = objectType({
    name:"Query",
    definition:(t) => {
        t.list.field('getAllUser',{type:'User',resolve:getAllUserResolver}),
        t.field('me', me)
    }
})