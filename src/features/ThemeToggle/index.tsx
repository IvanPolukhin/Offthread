import { Label } from 'src/components/ui/label';
import { Switch } from 'src/components/ui/switch';
import { useThemeToggle } from 'src/features/ThemeToggle/useThemeToggle.ts';

export const ThemeSwitch = () => {
  const { isDark, handleChange } = useThemeToggle();
  return (
    <div className="flex items-center space-x-2">
      <Switch id="theme-mode" checked={isDark} onCheckedChange={handleChange} />
      <Label htmlFor="theme-mode">{isDark ? 'Dark mode' : 'Light mode'}</Label>
    </div>
  );
};
