import { API_ENDPOINTS } from '../constants/api-endpoints';
import { xiorClient } from '../lib/xior-client';

interface CreateCheckoutResponse {
  checkoutUrl: string;
}

interface PaymentsService {
  createCheckout: (productId: string) => Promise<CreateCheckoutResponse>;
}

const createCheckout = async (
  productId: string
): Promise<CreateCheckoutResponse> => {
  const response = await xiorClient.post<CreateCheckoutResponse>(
    API_ENDPOINTS.CREATE_CHECKOUT,
    { productId }
  );
  return response.data;
};

export const paymentsService: PaymentsService = {
  createCheckout,
};
