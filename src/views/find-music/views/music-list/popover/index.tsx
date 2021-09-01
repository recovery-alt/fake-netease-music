import React, { useState, useRef, useEffect } from 'react';
import { useClickAway } from 'react-use';
import { Subcategory } from '@/types';
import { getAllMusicCategory } from '@/api';
import { GlobalOutlined } from '@ant-design/icons';
import styles from './popover.module.less';
import classNames from 'classnames';

type Props = {
  cat: string;
  setCat: (cat: string) => void;
  setShowPopover: (show: boolean) => void;
  button: HTMLButtonElement | null;
};

const Popover: React.FC<Props> = ({ cat, setCat, button, setShowPopover }) => {
  type MusicCategoryType = { name: string; data: Subcategory[] };
  const [allMusicCategory, setAllMusicCategory] = useState<MusicCategoryType[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  function handleItemClick(cat: string) {
    setCat(cat);
    setShowPopover(false);
  }

  useClickAway(ref, e => {
    if (e.target !== button) setShowPopover(false);
  });

  useEffect(() => {
    console.log(cat);
  }, [cat]);

  useEffect(() => {
    (async () => {
      const res = await getAllMusicCategory();
      const allMusicCategory = Object.keys(res.categories).map(key => {
        const item = res.categories[key];
        const data: Subcategory[] = [];
        const index = Number(key);
        const category: MusicCategoryType = { data, name: item };
        res.sub.forEach(sub => {
          if (sub.category === index) category.data.push(sub);
        });

        return category;
      });
      setAllMusicCategory(allMusicCategory);
    })();
  }, []);

  return (
    <div ref={ref} className={styles.popover}>
      <header className={styles.popover__header}>
        <button
          className={classNames({ [styles['--active']]: cat === '全部' })}
          onClick={() => handleItemClick('全部')}
        >
          全部歌单
        </button>
      </header>
      {allMusicCategory.map(item => (
        <section key={item.name} className={styles.popover__item}>
          <div className={styles.popover__left}>
            <GlobalOutlined />
            <span>{item.name}</span>
          </div>
          <div className={styles.popover__right}>
            {item.data.map(sub => (
              <div
                key={sub.name}
                className={classNames(styles.popover__label, {
                  [styles['--active']]: sub.name === cat,
                })}
                onClick={() => handleItemClick(sub.name)}
              >
                <span>{sub.name}</span>
                {sub.hot && <strong>HOT</strong>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Popover;
