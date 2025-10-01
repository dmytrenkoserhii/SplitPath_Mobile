import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useCreateCheckout } from '@/src/hooks/payment';
import { queryKeys } from '@/src/lib';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: Replace with actual product and redirect URLs
const SUCCESS_REDIRECT_URL = 'https://your-app.com/payment-success';
const CANCEL_REDIRECT_URL = 'https://your-app.com/payment-cancel';

export const PaymentButton = () => {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: createCheckout, isPending } = useCreateCheckout(
    (data: any) => {
      setCheckoutUrl(data.checkoutUrl);
    }
  );

  const handleGoPremium = () => {
    const productId = process.env.EXPO_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID;
    if (!productId) {
      throw new Error('Lemon Squeezy product ID is not set');
    }

    createCheckout(productId);
  };

  const handleCloseModal = (isSuccess: boolean) => {
    setCheckoutUrl(null);
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    }
  };

  return (
    <View>
      <Button
        title={isPending ? 'Loading...' : 'Go Premium'}
        onPress={handleGoPremium}
        disabled={isPending}
      />

      <Modal
        visible={!!checkoutUrl}
        onRequestClose={() => handleCloseModal(false)}
        animationType="slide"
      >
        <SafeAreaView style={styles.container}>
          <Button title="Close" onPress={() => handleCloseModal(false)} />
          {checkoutUrl && (
            <WebView
              source={{ uri: checkoutUrl }}
              onNavigationStateChange={navState => {
                if (navState.url.startsWith(SUCCESS_REDIRECT_URL)) {
                  handleCloseModal(true);
                } else if (navState.url.startsWith(CANCEL_REDIRECT_URL)) {
                  handleCloseModal(false);
                }
              }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
