# اسلامی ایپ (Android) – APK kaise banayein

Ye project aap ki Islamic App ko asli Android app bana deta hai. Is mein azan **apne waqt par khud bajti hai, chahe app band ho**.

## Tareeqa 1: GitHub se (Android Studio ki zaroorat nahi, free)

1. github.com par free account banao, phir **New repository** dabao (naam: `islamic-app`).
2. Is zip ko unzip karo. Us ke **andar ki saari files aur folders** (`app`, `.github`, `build.gradle`, `settings.gradle`, `gradle.properties`, `.gitignore`) repository mein upload karo (**Add file → Upload files**).
   - Zaroor check karo ke `.github/workflows/build.yml` upload hui hai. Agar nazar na aaye to **Add file → Create new file** mein naam `.github/workflows/build.yml` likh kar is ka text paste kar do.
3. Upar **Actions** tab kholo. Agar "Build APK" chal chuka ho to theek, warna us par click karke **Run workflow** dabao.
4. 5-10 minute baad run ke aage hara ✅ aayega. Us par click karo, neeche **Artifacts** mein `IslamicApp-APK` download karo, zip kholo, andar `app-debug.apk` hai.
5. APK phone mein bhejo aur install karo (phone "unknown source se install" ki ijazat maangega).

Agar build mein laal ❌ aaye to us ka error text mujhe bhej do, main theek kar dunga.

## Install ke baad (bohat zaroori)

App kholo → **ترتیبات** tab mein:
1. **نوٹیفکیشن کی اجازت** do.
2. **درست وقت پر الارم کی اجازت** do (Android 12+).
3. **بیٹری پابندی ہٹائیں** par jao aur is app ko "Unrestricted/No restrictions" kar do.
4. Apni azan ki mp3 chuno (📂 button) aur **اذان ٹیسٹ کریں** se check karo.

## Khayal rakhne ki baatein

- Azan phone ki **alarm volume** par bajti hai. Alarm volume kam ho to awaz kam aayegi.
- Xiaomi, Oppo, Vivo, Realme, Infinix, Tecno jaise phones mein ek aur setting hoti hai (Autostart / App launch / Background activity). Is app ko wahan bhi allow karo, warna ye phones app ko band kar dete hain.
- Azan ke waqt 30 din aage tak set hote hain. App kam az kam mahine mein ek baar kholte raho, ya phone restart par ye khud dobara set ho jate hain.
- Ye "debug" APK hai, apne phone par chalane ke liye. Play Store ke liye signed version aur Google ki alarm/notification policies alag se chahiye.
