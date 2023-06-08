export const isSignedIn = async () => {
  const signedIn = { response: false, accessToken: '' };

  try {
    // Retreive the credentials
    // const credentials = await sessionStorage.getItem("userData");
    const credentials = await localStorage.getItem('userData');

    if (credentials) {
      const objCredentials = JSON.parse(credentials);

      signedIn.response = true;
      signedIn.accessToken = objCredentials.access_token;
      signedIn.codigoUsuario = objCredentials.codigoUsuario;
      signedIn.userName = objCredentials.userName;
      signedIn.nombreCompletoUsuario = objCredentials.nombreCompletoUsuario;
      signedIn.imagenPerfil = objCredentials.imagenPerfil;
      signedIn.roles = objCredentials.roles;
    }
  } catch (error) {
    signedIn.message = `Error al obtener los datos de sesión!${  error}`;
  }
  return signedIn;
};

export const signIn = async (authInfo) => {
  if (!authInfo.error) {
    try {
      // Store the credentials
      // sessionStorage.setItem("userData", JSON.stringify(authInfo));
      localStorage.setItem('userData', JSON.stringify(authInfo));
    } catch (error) {
      // Error saving data

      return null;
    }
    return true;
  } 
    await signOut(); // Eliminamos todas las sesiones para evitar sesiones activas zombies.
    return false;
  
};

export const signOut = async () => {
  try {
    // sessionStorage.setItem("userData", "");
    // sessionStorage.clear();
    localStorage.setItem('userData', '');
    localStorage.clear();
  } catch (error) {
    alert(`ERROR CERRAR SESION${  error}`);
  }


  return true;
};

export const profileImageChange = async (uri) => {
  try {
    // Retreive the credentials
    // const credentials = await sessionStorage.getItem("userData");
    const userData = await localStorage.getItem('userData');

    if (userData) {
      const objUserData = JSON.parse(userData);
      objUserData.imagenPerfil = uri;
      localStorage.setItem('userData', JSON.stringify(objUserData));
    }
  } catch (error) {
    console.error('Error al cambiar imagen de perfil');
  }
};
