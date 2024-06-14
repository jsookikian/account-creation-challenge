import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';
/*
  TODO: 
    - Build out form components for fields
    - Disable button until form is filled out
*/
export function CreateUser() {
  return (
    <FlowLayout>
      <Card title="What's your first and last name?">
        <div className="space-y-2 mt-8 flex flex-col ">
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email" />
          <Button href="/signup/joint-access" styles="w-full flex justify-center self-center">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
