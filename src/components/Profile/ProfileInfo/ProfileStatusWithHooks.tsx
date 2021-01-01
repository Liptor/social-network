import React, { useEffect, useState } from "react";

type ProfileStatus = {
  status: string;
  updateStatus: (status: string) => void;
}

const ProfileStatusWithHooks: React.FC<ProfileStatus> = ({ status, updateStatus }) => {
  let [editMode, setEditMode] = useState(false);
  let [statusProfile, setStatusProfile] = useState(status);

  useEffect(() => {
    setStatusProfile(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(status);
  };

  const onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatusProfile(e.currentTarget.value)
  };

  return (
    <div>
      <b>Status: </b>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{statusProfile}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
