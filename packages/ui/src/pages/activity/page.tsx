/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useState } from 'react';
import Listing from './components/listing';

export default function Activity() {
  const [updateList, setUpdateList] = useState(true);


  return (
    <div className='p-6 gap-5 flex-col flex'>
      <Listing updateList={updateList} setUpdateList={setUpdateList} />
    </div>
  );
}
