import React from 'react';

import PasswordForm from './PasswordForm';
import PofileForm from './ProfileForm';

function Profile() {

  return (
    <React.Fragment>

      <PofileForm />
      
      <PasswordForm />

    </React.Fragment>

  );
}

export default Profile;