import { xiorClient } from "../lib/xior-client";
import { User } from "../types/user";

export class UsersService {
  async findAll(): Promise<User[]> {
    const response = await xiorClient.get<User[]>("/users");
    return response.data;
  }

  async getCurrent(): Promise<User> {
    const response = await xiorClient.get<User>("/users/current");
    return response.data;
  }

  async findOneById(id: number): Promise<User> {
    const response = await xiorClient.get<User>(`/users/${id}`);
    return response.data;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const response = await xiorClient.get<User | null>(`/users/email/${email}`);
    return response.data;
  }

  async deleteById(id: number): Promise<{ deleted: boolean }> {
    const response = await xiorClient.delete<{ deleted: boolean }>(
      `/users/${id}`
    );
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await xiorClient.patch<User>("/users/profile", data);
    return response.data;
  }

  async uploadAvatar(formData: FormData): Promise<User> {
    const response = await xiorClient.post<User>("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async verifyEmail(token: string): Promise<void> {
    await xiorClient.post("/auth/verify-email", { token });
  }

  async resendVerificationEmail(): Promise<void> {
    await xiorClient.get("/users/resend-verification");
  }
}

export const usersService = new UsersService();
