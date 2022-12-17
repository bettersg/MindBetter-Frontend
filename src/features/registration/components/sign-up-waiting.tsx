import { CheckCircleIcon } from "@chakra-ui/icons";
import { Center, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { User, UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "../../../data/auth/loginCredentials";
import { useAuth } from "../../../services/firebase/authProvider";

export default function SignUpWaiting(loginCredentials: LoginCredentials) {

    const [isLoading, setLoading] = useState(true);
    const { signUp } = useAuth();
    const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

    const navigate = useNavigate();
    const handleSignIn = async () => {
        console.log(`sign up request sent ${loginCredentials.email}, ${loginCredentials.password}`)
        try{
            setLoading(true);
            let userCred: UserCredential = await signUp(loginCredentials.email, loginCredentials.password);
            let user: User = userCred.user
            let token: string = await user.getIdToken();
            console.log(`Authentication success userid: ${user.uid}, ${token}`);
            setLoading(false);
            console.log('Routing to user dashboard page.');
            await delay(2000);
            navigate("/dashboard");
        } catch(error: unknown) {
            let errorMessage = 'error.unknown';
            if (typeof error === 'string') {
                errorMessage = error.toUpperCase()
              } else if (error instanceof Error) {
                errorMessage = error.message
              }

            console.log(`Sign Up failed ${errorMessage}`);

            // TODO Create alert and navigate to sign up page.\\
        }
    }

    useEffect(() => {

        if (!loginCredentials.validated) {
            console.log("Login credentials are not validated. Redirecting to sign up.");
            // TODO created alart and redirect to sign up page if login credentials are not valid
        }

        handleSignIn();
    },[])

    return (
        <Center >
            <VStack>
                <Image src="/images/cat.png"></Image>
                {isLoading ? (
                    <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                ) : (
                    <CheckCircleIcon w={8} h={8} color="green.500" />
                )}
                <Text className="loadingTitle">Welcome, {loginCredentials.email.split("@",1)}! 👋🏻</Text>
                <Text className="loadingSubTitle">We’re setting up your profile right now. This will take just a second!</Text>
                <Text className="loadingInfo">Do you know that there are over 2000 charitable organisations in Singapore? Last year, registered charities attracted approximately S$3.1bn in annual donations.</Text>
            </VStack>
        </Center>
    )
}