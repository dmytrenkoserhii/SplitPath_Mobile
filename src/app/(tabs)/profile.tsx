import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  MD3Theme,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { ProfileDisplayView, ProfileEditForm } from '../../components/profile';
import {
  UpdateAccountFormSchema,
  UpdateAccountFormSchemaType,
} from '../../schemas/account';
import { accountsService } from '../../services/accounts.service';
import { Account } from '../../types/user/account.interface';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    data: account,
    isLoading,
    error,
  } = useQuery<Account>({
    queryKey: ['account'],
    queryFn: accountsService.getCurrent,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateAccountFormSchemaType>({
    resolver: zodResolver(UpdateAccountFormSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (account) {
      reset({
        username: account.username || '',
        firstName: account.firstName || '',
        lastName: account.lastName || '',
        birthDate: account.birthDate ? new Date(account.birthDate) : null,
        bio: account.bio || '',
      });
    }
  }, [account, reset]);

  const { mutate: updateAccount, isPending: isUpdating } = useMutation<
    Account,
    Error,
    UpdateAccountFormSchemaType
  >({
    mutationFn: (values: UpdateAccountFormSchemaType) => {
      const payload: UpdateAccountFormSchemaType = {
        ...values,
        birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
      };
      return accountsService.update(payload);
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['account'] });
      setIsEditing(false);
    },
    onError: (err: any) => {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: err.message || 'An unexpected error occurred.',
      });
    },
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !account) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load profile data.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Title style={styles.title}>My Profile</Title>
      <Card style={styles.card}>
        <Card.Content>
          {isEditing ? (
            <ProfileEditForm control={control} errors={errors} />
          ) : (
            <ProfileDisplayView account={account} />
          )}
        </Card.Content>
        <Card.Actions>
          {isEditing ? (
            <View style={styles.buttonGroup}>
              <Button mode="outlined" onPress={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit(formData => updateAccount(formData))}
                loading={isUpdating}
                disabled={isUpdating}
              >
                Save Changes
              </Button>
            </View>
          ) : (
            <Button mode="contained" onPress={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      padding: 20,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.onSurface,
    },
    card: {
      marginBottom: 20,
      backgroundColor: theme.colors.surface,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 16,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flex: 1,
      gap: 8,
    },
  });
