import { objectType } from "nexus";
import { inviteUserConfig } from "./mutations/inviteUser";
import { login } from "./mutations/login";
import { signup } from "./mutations/signup";

export const Mutation = objectType({
    name:"Mutation",
    definition:(t) => {
        t.field('inviteUser', inviteUserConfig)
        t.field('signup', signup)
        t.field('login', login)
    }
})