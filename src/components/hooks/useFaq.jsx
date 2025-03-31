import React, { useEffect, useState } from 'react';
import { useNav } from '@components/hooks';
import { getMainFaq } from '@api/Main';
import { useTranslation } from 'react-i18next';

export const useFaq = () => {
  const [isLoading, setLoading] = useState(true);
  const { handleNav, state } = useNav();
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [fillterItems, setFillterItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState('A');
  const tab = [
    { title: t('faq.common'), value: 'A' },
    { title: t('faq.client'), value: 'B' },
    { title: t('faq.dental_lab'), value: 'C' },
    { title: t('faq.dental_designer'), value: 'D' },
  ];

  const fetchFaq = async () => {
    try {
      const r = await getMainFaq();
      const dt = r?.data;
      // console.log(dt);
      if (dt) {
        setItems(dt);
      }
    } catch (e) {
      console.log(e)
    } finally {
      if (state?.selectedTab) setSelectedTab(state?.selectedTab);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  useEffect(() => {
    const faq = items?.filter((el) => el.bbsTp === selectedTab);
    setFillterItems(faq);
  }, [selectedTab, items]);

  return { isLoading, items, fillterItems, selectedTab, setSelectedTab, tab };
};

export default useFaq;
