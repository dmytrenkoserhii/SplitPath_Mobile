import React from "react";
import { Alert } from "react-native";
import { Button } from "react-native-elements";
import { useAuth } from "../../context";
import { useSignOut } from "../../hooks/auth";

interface LogoutButtonProps {
  title?: string;
  type?: "solid" | "clear" | "outline";
  buttonStyle?: any;
  titleStyle?: any;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  title = "Logout",
  type = "outline",
  buttonStyle,
  titleStyle,
}) => {
  const { user } = useAuth();
  const signOutMutation = useSignOut();

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      `Are you sure you want to logout, ${
        user?.account?.username || user?.email
      }?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            console.log("🚪 Logout button pressed, starting logout...");
            signOutMutation.mutate(undefined, {
              onSuccess: () => {
                console.log("✅ User logged out successfully");
              },
              onError: (error) => {
                console.error("❌ Logout error:", error);
                Alert.alert("Error", "Failed to logout. Please try again.");
              },
            });
          },
        },
      ]
    );
  };

  return (
    <Button
      title={title}
      type={type}
      onPress={handleLogout}
      buttonStyle={[
        {
          borderColor: "#fa5252",
        },
        buttonStyle,
      ]}
      titleStyle={[
        {
          color: type === "solid" ? "#ffffff" : "#fa5252",
        },
        titleStyle,
      ]}
    />
  );
};
