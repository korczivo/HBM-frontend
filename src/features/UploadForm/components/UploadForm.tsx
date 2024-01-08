import type { ChangeEvent } from 'react';

type UploadFormProps = {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export const UploadForm = ({ handleInputChange }: UploadFormProps) => {
  return (
    <form className="mb-6">
      <input type="file" onChange={handleInputChange} />
    </form>
  );
};
