import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TextInput, useTheme } from 'react-native-paper';
import dayjs from 'dayjs';

import { UpdateAccountFormSchemaType } from '../../schemas/account';

type ProfileEditFormProps = {
  control: Control<UpdateAccountFormSchemaType>;
  errors: FieldErrors<UpdateAccountFormSchemaType>;
};

export const ProfileEditForm = ({ control, errors }: ProfileEditFormProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Username"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.username}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="First Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.firstName}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Last Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.lastName}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Birth Date (YYYY-MM-DD)"
              mode="outlined"
              placeholder="e.g., 1995-05-15"
              onChangeText={text => {
                if (dayjs(text, 'YYYY-MM-DD', true).isValid()) {
                  onChange(new Date(text));
                }
              }}
              value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
              error={!!errors.birthDate}
            />
          )}
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Bio"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.bio}
              multiline
              numberOfLines={3}
            />
          )}
        />
        {errors.bio && (
          <Text style={styles.errorText}>{errors.bio.message}</Text>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    inputContainer: {
      marginBottom: 16,
    },
    errorText: {
      color: theme.colors.error,
      marginLeft: 8,
      marginTop: 4,
      fontSize: 12,
    },
  });
