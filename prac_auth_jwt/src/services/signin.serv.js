import { SignInRepo } from "../repositories/signin.repo.js"

export class SignInServ {
    signInRepository = new SignInRepo();

    signIn = async (email, password) => {
        const token = await this.signInRepository.signIn(email, password);

        return token
    }

}