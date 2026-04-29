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
import useLoginForm from "../hooks/useLoginForm";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formInputConfig,
    serverError,
    isValid,
    isSubmitting,
  } = useLoginForm();

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="w-md min-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription className="sr-only">log-in form</CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to="/signup">Sign up</Link>
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
            <Button size="lg" type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader /> Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
