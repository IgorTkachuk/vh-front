import React, { ChangeEventHandler, FC, useState } from 'react';
import { useSendFileMutation } from '../../api/objectAPI/objectApi';

const ObjectUpload: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [personalNumber, setPersonalNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [addObject] = useSendFileMutation();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedFile !== undefined) {
      formData.append('file', selectedFile);

      const origDate = new Date(
        selectedFile?.lastModified
      ).toLocaleDateString();

      formData.append('orig_date', origDate);
    }
    formData.append('billing_pn', personalNumber);
    formData.append('notes', description);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    addObject(formData);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;

    if (files !== null && files?.length > 0) {
      setSelectedFile(files[0]);
      console.log(selectedFile);
    }
  };

  const handlePersonalNumberInput: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPersonalNumber(e.currentTarget.value);
  };

  const handleDescriptionInput: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDescription(event.currentTarget.value);
  };

  return (
    <form
      className="flex flex-col w-full h-screen justify-center items-center"
      onSubmit={handleFormSubmit}
    >
      <label>
        <span>Select file:</span>
        <input
          type="file"
          accept="video/mp4, video/avi, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
        />
      </label>
      <label>
        <span>Personal number:</span>
        <input
          type="text"
          value={personalNumber}
          placeholder="Personal number ..."
          onChange={handlePersonalNumberInput}
        />
      </label>
      <label>
        <span>Description:</span>
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={handleDescriptionInput}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default ObjectUpload;
