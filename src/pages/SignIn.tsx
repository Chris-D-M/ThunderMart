import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {View, Text, Pressable, Alert, StyleSheet, Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
const SignIn = ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = useState('');
  const eamilRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const inputed = email && password;

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      Alert.alert('이메일을 입력해주세요');
      eamilRef.current?.focus();
    }
    if (!password || !password.trim()) {
      Alert.alert('비밀번호를 입력해주세요');
      passwordRef.current?.focus();
    }
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  return (
    <View>
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이메일을 입력해주세요"
            value={email}
            onChangeText={onChangeEmail}
            importantForAutofill="yes"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            blurOnSubmit={false}
            ref={eamilRef}
            clearButtonMode="while-editing"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={true}
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            onSubmitEditing={() => {
              if (inputed) {
                onSubmit();
              } else {
                Alert.alert('이메일과 비밀번호를 입력해주세요');
              }
            }}
            ref={passwordRef}
          />
        </View>
        <View style={styles.buttonZone}>
          <Pressable
            onPress={onSubmit}
            style={
              !inputed
                ? styles.loginButton
                : [styles.loginButton, styles.loginButtonActive]
            }
            disabled={!inputed}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </Pressable>
          <Pressable onPress={toSignUp}>
            <Text>회원가입하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 5,
    // width: '80%',
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonZone: {
    alignItems: 'center',
  },
});

export default SignIn;
