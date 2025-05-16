import { storageService } from '../../services/storage.service';
import { Lamp, Sun } from '../../shared/icons';

export const ThemeSwitcher = ({ theme, setTheme }: any) => {
  const isSwitcher = (themeValue: string) => themeValue === 'dark';
  const switchHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const themeValue: string = event.target.checked ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', themeValue);
    storageService.setThemeToSessionStorage(themeValue);
    setTheme(themeValue);

    if (themeValue === 'dark') {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen().then(() => {});
    }
  };

  return (
    <div>
      <input onChange={switchHandle} className="checkbox" id="checkbox1" checked={isSwitcher(theme)} type="checkbox" />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
      <label htmlFor="checkbox1" className="checkbox-label">
        <span className="on">
          <Lamp />
        </span>
        <span className="off">
          <Sun />
        </span>
      </label>
    </div>
  );
};
