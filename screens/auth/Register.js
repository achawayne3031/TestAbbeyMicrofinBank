import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Button from "../../components/widgets/Button";
import InputField from "../../components/form/InputField";
import { useContext, useEffect, useState } from "react";
import { RegisterValidation } from "../../validations/AuthValidation";
import { useFormik } from "formik";
import { GlobalStyles } from "../../constants/style";
import FlatButton from "../../components/widgets/FlatButton";
import axiosInstance from "../../config/AxiosConfig";
import { useNavigation } from "@react-navigation/native";

function Register() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "full_name":
        setFieldValue("full_name", enteredValue);

        break;

      case "email":
        setFieldValue("email", enteredValue);

        break;

      case "password":
        setFieldValue("password", enteredValue);
        break;
    }
  }

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: { full_name: "", email: "", password: "" },
    validationSchema: RegisterValidation,
    onSubmit: () => initRequest(),
  });

  const initRequest = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/register", values);
      setIsLoading(false);
      console.log(response);
      // navigation.replace("Register");
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      Alert.alert("Error input", "Network Error");
    }
  };

  function handlePageReplace() {
    navigation.replace("Login");
  }

  return (
    <View style={styles.authContent}>
      <View>
        <InputField
          label="Full Name"
          onUpdateValue={updateInputValueHandler.bind(this, "full_name")}
          value={values.full_name}
          isInvalid={errors.full_name}
        />

        <InputField
          label="Email Address"
          keyboardType="email-address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={values.email}
          isInvalid={errors.email}
        />

        <InputField
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={values.password}
          isInvalid={errors.password}
        />

        <View style={styles.buttons}>
          <Button
            onPress={handleSubmit}
            isLoading={isLoading}
            children={"Register"}
          />
        </View>

        <View style={styles.regWrapper}>
          <Text style={styles.notYetRegisteredText}>Already registered ?</Text>
          <FlatButton children={"Click here"} onPress={handlePageReplace} />
        </View>
      </View>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  regWrapper: {
    marginTop: 10,
  },
  notYetRegisteredText: {
    textAlign: "center",
    fontSize: 15,
    color: GlobalStyles.color.primary100,
    marginTop: 5,
  },

  buttons: {
    marginTop: 12,
  },
  forms: {
    flex: 1,
  },

  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.color.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
