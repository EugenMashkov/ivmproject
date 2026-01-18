# Инструкции по восстановлению проекта после обновления macOS

## Текущее состояние проекта
- **Дата последнего бэкапа**: $(date +"%Y-%m-%d %H:%M:%S")
- **Git репозиторий**: https://github.com/EugenMashkov/ivmproject.git
- **Ветка**: main
- **Последний commit**: 68bf9e1

## Резервные копии

### 1. Git репозиторий на GitHub
Все изменения сохранены в GitHub. Для восстановления:
```bash
cd /Users/ievgen/Desktop
git clone https://github.com/EugenMashkov/ivmproject.git
```

### 2. Локальные резервные копии
На рабочем столе созданы:
- Папка резервной копии: `ievproject_backup_[timestamp]`
- Архив: `ievproject_backup_[timestamp].tar.gz`

### 3. Восстановление из архива
```bash
cd /Users/ievgen/Desktop
tar -xzf ievproject_backup_[timestamp].tar.gz
```

## Важные файлы проекта
- `index.html` - главный HTML файл (11K)
- `script.js` - JavaScript код (6.9K)
- `styles.css` - стили (13K)
- Изображения: dr1-8.png, IM3.jpg, logo3.png
- Видео: df1.MP4, df2.MP4, df3.mov, df4.mov

## После обновления macOS

1. **Проверьте GitHub репозиторий**:
   - Откройте: https://github.com/EugenMashkov/ivmproject
   - Убедитесь, что все файлы на месте

2. **Восстановите проект из GitHub** (рекомендуется):
   ```bash
   cd /Users/ievgen/Desktop
   git clone https://github.com/EugenMashkov/ivmproject.git
   ```

3. **Или восстановите из локальной резервной копии**:
   ```bash
   cd /Users/ievgen/Desktop
   # Найдите последний архив или папку резервной копии
   tar -xzf ievproject_backup_*.tar.gz
   # или скопируйте папку резервной копии
   ```

4. **Проверьте работоспособность**:
   ```bash
   cd ievproject
   python3 -m http.server 8000
   # Откройте http://localhost:8000 в браузере
   ```

## Дополнительные рекомендации

- Регулярно делайте `git push` перед важными изменениями
- Храните резервные копии в облаке (iCloud, Dropbox, Google Drive)
- Используйте Time Machine для полного бэкапа системы

## Контакты для восстановления
Если что-то пошло не так, все файлы находятся в GitHub репозитории.


