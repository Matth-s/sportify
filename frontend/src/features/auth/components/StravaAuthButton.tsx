import React from "react";

import { Button } from "@/components/ui/button";
import { stravaLoginAction } from "../actions/strava-login-action";

type StravaAuthButtonProps = {
  isDisabled: boolean;
};

const StravaAuthButton = ({ isDisabled }: StravaAuthButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full cursor-pointer bg-orange-500 text-white hover:bg-orange-500/80"
      disabled={isDisabled}
      onClick={() => stravaLoginAction()}
    >
      Se connecter avec strava
    </Button>
  );
};

export default StravaAuthButton;
