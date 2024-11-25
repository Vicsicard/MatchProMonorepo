import React from 'react';
import { Button } from '@matchpro/ui';
import { supabase } from '@matchpro/data';
import '@matchpro/styles/src/tailwind.css';

const TestSharedLibs: React.FC = () => {
  const handleClick = async () => {
    // Test Supabase connection
    const { data, error } = await supabase.auth.getSession();
    console.log('Supabase session:', data, error);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Test Shared Libraries</h2>
      <Button onClick={handleClick}>
        Test Supabase Connection
      </Button>
    </div>
  );
};

export default TestSharedLibs;
