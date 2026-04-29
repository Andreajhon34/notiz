import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInputFieldList } from "../components/FormInput";
import useSignUpForm from "../hooks/useSignUpForm";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formInputConfig,
    serverError,
    isValid,
    isSubmitting,
  } = useSignUpForm();

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="w-md min-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription className="sr-only">sign-up form</CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 items-center">
              <FormInputFieldList fields={formInputConfig} control={control} />
              {serverError && (
                <p className="text-destructive">{serverError.message}</p>
              )}
            </div>
            <Button
              size="lg"
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader /> Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
