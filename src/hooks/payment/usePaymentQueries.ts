import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsService } from '@/src/services';

export const useCreateCheckout = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationFn: (productId: string) =>
      paymentsService.createCheckout(productId),
    onError: (error: any) => {
      console.error('❌ Failed to create checkout session:', error);
    },
    onSuccess,
  });
};
