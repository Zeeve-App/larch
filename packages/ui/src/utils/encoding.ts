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

export const decodeBase64 = (base64String: string) => {
  const decoder = new TextDecoder('utf-8');
  const decodedOutput = decoder.decode(Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0)));
  return decodedOutput;
};

export const encodeBase64 = (plainString: string) => {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(plainString);
  const base64String = btoa(String.fromCharCode(...utf8Bytes));
  return base64String;
};
