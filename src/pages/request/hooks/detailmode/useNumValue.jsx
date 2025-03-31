import { useEffect, useState } from 'react';

export const useNumValue = () => {
  const [isModal, setModal] = useState(false);
  const values = [
    { title: 'Cement gap', id: 'CEMENT_GAP_VALUE' },
    { title: 'Extra cement gap', id: 'EXTRA_GAP_VALUE' },
    { title: 'Occlusal distance', id: 'OCCLUSAL_DISTANCE_VALUE' },
    { title: 'Approximal distance', id: 'APPROXIMAL_DISTANCE_VALUE' },
    { title: 'Height for minimal gap', id: 'HEIGHT_MINIMAL_VALUE' },
  ];
  return { isModal, setModal };
};
