import { FilterOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import { DynamicPage } from '@/router';
import { PlaylistHighqualityTags } from '@/types';
import { classGenerator } from '@/utils';

export function usePopover(tags: PlaylistHighqualityTags[], cat: string) {
  const getClass = classGenerator('excellent');
  const { push } = useHistory();
  const buttonContext = (
    <>
      <FilterOutlined />
      筛选
    </>
  );

  function handleItemChange(targetCat: string) {
    if (targetCat !== cat) push(DynamicPage.excellentList(targetCat));
  }

  function renderPopover() {
    return (
      <div className={getClass('popover')}>
        <header className={getClass('popover-header')}>
          <span
            className={classNames({ '--active': cat === '全部' })}
            onClick={() => handleItemChange('全部')}
          >
            全部歌单
          </span>
        </header>
        <section className={getClass('popover-card')}>
          {tags.map(item => (
            <div key={item.id}>
              <span
                className={classNames({ '--active': item.name === cat })}
                onClick={() => handleItemChange(item.name)}
              >
                {item.name}
              </span>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return { buttonContext, renderPopover };
}
