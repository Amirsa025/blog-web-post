import React from 'react';
import {useMutation} from "@tanstack/react-query";
import {authenticateService} from "../../helper/authenticateService";
const UseSignupMutation = () => {
    return useMutation((formPayload) => {
        return authenticateService.authenticate(formPayload)
    });

};

export default UseSignupMutation;
