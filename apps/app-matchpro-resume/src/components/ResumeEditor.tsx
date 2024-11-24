import React from 'react';
import { Button } from '@matchpro/ui';
import { supabase } from '@matchpro/data';

const ResumeEditor: React.FC = () => {
  const handleSave = async () => {
    try {
      // Example of using supabase client
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .limit(1);

      if (error) throw error;
      console.log('Resume data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Resume Editor</h2>
      <div className="space-y-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            className="input mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save Resume
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log('Preview clicked')}
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
