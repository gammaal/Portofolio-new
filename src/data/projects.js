/**
 * DAFTAR PROYEK — edit file ini saja untuk menambah / mengubah project.
 *
 * CARA MENAMBAH FOTO:
 * 1. Simpan gambar di folder: public/projects/
 *    Contoh: public/projects/toko-online.png
 * 2. Isi field `image` dengan path dari folder public (diawali /):
 *    image: '/projects/toko-online.png'
 * 3. Format yang disarankan: JPG atau PNG, rasio 16:9, lebar ± 1200px
 *
 * Field opsional:
 * - demoUrl  → link live demo (tombol "Lihat")
 * - repoUrl  → link GitHub (tombol "Repo"); kosongkan jika tidak ada
 */

export const projects = [
  {
    id: 'project-1',
    title: 'Project 1',
    description:
      'Deskripsi singkat project kamu. Jelaskan fitur utama dan manfaatnya.',
    image: '/projects/projek 1.png',
    tags: ['React'],
  },
  {
    id: 'project-2',
    title: 'Project 2',
    description:
      'Deskripsi singkat project kamu. Jelaskan apa yang membuat project ini menarik.',
    image: '/projects/projek2.png',
    tags: ['React'],
  },
  {
    id: 'project-3',
    title: 'Project 3',
    description:
      'Deskripsi singkat project kamu. Tambahkan info stack dan tujuan project.',
    image: '/projects/projek3.png',
    tags: ['Laravel'],
  },
  {
    id: 'project-4',
    title: 'Project 4',
    description:
      'Deskripsi singkat project kamu. Tambahkan highlight fitur yang paling keren.',
    image: '/projects/projek 4.png',
    tags: ['Laravel'],
  },
]
