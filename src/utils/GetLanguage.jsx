import { useState } from 'react';

export const GetLanguage = (languageSeting) => {
  const [language, setLanguage] = useState('english')
  setLanguage(languageSeting)
  return language
}