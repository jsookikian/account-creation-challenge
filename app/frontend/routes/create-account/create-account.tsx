import React, { useEffect, useState } from 'react';
import { Card } from '../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { Button } from 'app/frontend/reusable-components/button/button.tsx';
import { useForm } from "react-hook-form";
import { useCreateAccount } from 'app/frontend/hooks/useCreateAccount.tsx';
import zxcvbn from 'zxcvbn';
import { CreateAccountFormData, useValidationResolver } from 'app/frontend/hooks/useValidationResolver.tsx';

const passwordStrengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];


export function CreateAccount() {
  const resolver = useValidationResolver();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register, handleSubmit, setFocus, formState: { isValid, isDirty, errors } } = useForm<CreateAccountFormData>({ mode: 'onChange', resolver });
  const { error, status, createAccount } = useCreateAccount();
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      await createAccount(data);
      q
    } catch (error) {
      console.log('Error creating account');
    }
  }

  useEffect(() => {
    // Focus the username input on component load
    setFocus("username");
  }, [setFocus]);

  /*
   We pull out the password register to allow us to write a custom onChange 
   on top of the built in react-hook-form onChange handler
   */
  const passwordRegister = register("password", { required: true })

  return (
    <FlowLayout>
      <div className="flex justify-center w-full max-w-[600px] ">
        <Card showIcon title="Create New Account" styles="font-black text-3xl text-center">
          <div className="space-y-4 mt-6">
            <form className="flex flex-col h-full justify-end" onSubmit={handleSubmit(onSubmit)} >
              {/* Username Input */}
              <div className="p-2 relative group" >
                <label className="block text-sm text-slate-500">Username</label>
                <div className="relative">
                  <input
                    data-testid="username-input-field"
                    id={'username'}
                    className={`block w-full outline-none peer`}
                    {...register("username", { required: true })}
                    required
                  />

                  <span className="
                    absolute w-full h-0.5 bg-slate-300 transition-all duration-300
                    peer-focus:bg-gradient-to-r 
                  peer-focus:from-[hsla(244,49%,49%,1)]
                  peer-focus:via-slate-300 
                  peer-focus:to-[hsla(244,49%,49%,1)]
                    peer-focus:bg-[length:200%_200%] 
                    peer-focus:animate-glow"
                  />
                  <div className="min-h-[21px]">
                    {errors.username && <span className="text-xs  text-red-600">{errors.username.message}</span>}
                  </div>
                </div>
              </div>
              <div>
              </div>
              {/* Password Input */}
              <div className="p-2 mb-6 relative group" >
                <label className="block text-sm text-slate-500">Password</label>
                <div className="relative">

                  <input
                    data-testid="password-input-field"
                    id='password'
                    type='password'
                    className={`block w-full outline-none peer focus-ring-0`}
                    {...passwordRegister}
                    // Custom onchange to show password meter only when password has been touched
                    onChange={
                      (e) => {
                        passwordRegister.onChange(e);
                        const value = e.target.value;
                        const result = zxcvbn(value);
                        setPasswordStrength(result.score);
                        setIsPasswordTouched(true)
                      }
                    }
                    required
                  />
                  <span className="
                    absolute w-full h-0.5 bg-slate-300 transition-all duration-300
                    peer-focus:bg-gradient-to-r 
                  peer-focus:from-[hsla(244,49%,49%,1)]
                  peer-focus:via-slate-300 
                  peer-focus:to-[hsla(244,49%,49%,1)]
                    peer-focus:bg-[length:200%_200%] 
                    peer-focus:animate-glow"
                  />
                  {/* Password Strength Meter */}
                  {isPasswordTouched &&
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded">
                        <div
                          className={`h-full ${passwordStrength === 0
                            ? 'bg-red-500'
                            : passwordStrength === 1
                              ? 'bg-orange-500'
                              : passwordStrength === 2
                                ? 'bg-yellow-500'
                                : passwordStrength === 3
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                            }`}
                          style={{ width: `${(passwordStrength + 1) * 20}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        Strength: {passwordStrengthLabels[passwordStrength]}
                      </p>
                    </div>
                  }
                  <div className="min-h-[22px]">
                    {errors.password && <span className="text-xs  text-red-600">{errors.password.message}</span>}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col justify-center self-center ">
                <Button
                  dataTestId='submit-button'
                  disabled={isDirty && !isValid}
                  styles="text-base"
                  type="submit"
                >
                  Create Account
                </Button>
                {error && <span className="text-xs text-center text-red-600">{`Error: ${error} (Status: ${status})`}</span>}

              </div>
            </form>
          </div>
        </Card>
      </div >
    </FlowLayout >
  );
}
