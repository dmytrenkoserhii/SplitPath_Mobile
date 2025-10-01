import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';

import { ProfileDisplayView, ProfileEditForm } from '@/src/components/profile';
import {
  UpdateAccountFormSchema,
  UpdateAccountFormSchemaType,
} from '@/src/schemas/account';
import { useCurrentAccount, useUpdateAccount } from '@/src/hooks/account';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const styles = createStyles(theme);

  const { data: account, isLoading, error } = useCurrentAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount();

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

  const handleUpdateAccount = (formData: UpdateAccountFormSchemaType) => {
    updateAccount(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

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
      <Text variant="titleLarge" style={styles.title}>
        My Profile
      </Text>
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
                onPress={handleSubmit(handleUpdateAccount)}
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
