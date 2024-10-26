import { useColorScheme } from '@mui/material/styles';
import { MenuItem, Select, SelectProps } from '@mui/material';

export default function ColorModeSelect(props: SelectProps) {
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    return (
        <Select
            value={mode}
            onChange={(event) =>
                setMode(event.target.value as 'system' | 'light' | 'dark')
            }
            SelectDisplayProps={{
                // @ts-expect-error not sure
                'data-screenshot': 'toggle-mode',
            }}
            {...props}
        >
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
        </Select>
    );
}
