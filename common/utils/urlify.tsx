import React from "react";
import { Link } from "../../styles/styledComponents/profile/profile.styled";

/*   __________<Нахождение ссылки в тексте (НЕ УДАЛЯТЬ!!!)>______ */

export const urlify = (text: string) => {
  const urlRegex =
    /(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(ftp:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(file:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(www.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  const urlRegex2 =
    /((https?:\/\/|ftp:\/\/|file:\/\/)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  return text.split(urlRegex).map((part, i, a) => {
    let url;
    if (part?.match(urlRegex)) {
      if (part.match(urlRegex2)) {
        url = part;
      } else url = "https://" + part;

      return (
        <Link key={i} href={url}>
          {part}
        </Link>
      );
    }
    return part;
  });
};
/*   __________</Нахождение ссылки в тексте (НЕ УДАЛЯТЬ!!!)>______ */
