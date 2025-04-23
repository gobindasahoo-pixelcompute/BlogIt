import React, { useEffect, useState } from "react";

import authApi from "apis/auth";
import SignupForm from "components/Authentication/Form/Signup";

import organizationsApi from "../../apis/organizations";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [organization, setOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: organization,
      });
      setLoading(false);
      history.push("/login");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const {
        data: { organizations },
      } = await organizationsApi.fetch();
      setOrganizations(organizations);
      setLoading(false);
    } catch (error) {
      logger.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <SignupForm
      {...{
        handleSubmit,
        loading,
        setEmail,
        setName,
        setPassword,
        setPasswordConfirmation,
        setOrganization,
        organizations,
      }}
    />
  );
};

export default Signup;
