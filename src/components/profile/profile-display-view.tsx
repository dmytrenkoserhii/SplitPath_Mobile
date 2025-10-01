import React from 'react';
import dayjs from 'dayjs';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { Account } from '@/src/types/user';

const ProfileDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || 'Not set'}</Text>
    </View>
  );
};

type ProfileDisplayViewProps = {
  account: Account;
};

export const ProfileDisplayView = ({ account }: ProfileDisplayViewProps) => {
  return (
    <>
      <ProfileDetail label="Username" value={account.username} />
      <ProfileDetail label="First Name" value={account.firstName} />
      <ProfileDetail label="Last Name" value={account.lastName} />
      <ProfileDetail
        label="Birth Date"
        value={
          account.birthDate
            ? dayjs(account.birthDate).format('MMMM D, YYYY')
            : null
        }
      />
      <ProfileDetail label="Bio" value={account.bio} />
    </>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    detailRow: {
      marginBottom: 16,
    },
    detailLabel: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 2,
    },
    detailValue: {
      fontSize: 18,
      color: theme.colors.onSurface,
    },
  });
