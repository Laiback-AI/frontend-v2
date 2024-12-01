import { Button } from '@nextui-org/react';

interface ToggleAuthButtonProps {
    isSignUp: boolean;
    onToggle: () => void;
}

const ToggleAuthButton = ({ isSignUp, onToggle }: ToggleAuthButtonProps) => (
    <Button fullWidth color="secondary" onPress={onToggle}>
        {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
    </Button>
);

export default ToggleAuthButton;