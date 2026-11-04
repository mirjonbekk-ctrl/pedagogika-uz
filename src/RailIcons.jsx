// Chap panel iconlari: Fluent Emoji (modern uslub, MIT litsenziya, Mohammad Abu Mattar).
// Fayllar src/assets/icons/ papkasida.
import newsSvg from './assets/icons/newspaper.svg?raw';
import micSvg from './assets/icons/studio-microphone.svg?raw';
import mapSvg from './assets/icons/world-map.svg?raw';
import filmSvg from './assets/icons/clapper-board.svg?raw';

const Icon = ({ svg, label }) => (
  <span className="rail-svg" role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const NewsIcon = () => <Icon svg={newsSvg} label="Yangiliklar" />;
export const VoiceIcon = () => <Icon svg={micSvg} label="Konferensiya" />;
export const MapIcon = () => <Icon svg={mapSvg} label="Xarita" />;
export const FilmIcon = () => <Icon svg={filmSvg} label="Video lavhalar" />;
