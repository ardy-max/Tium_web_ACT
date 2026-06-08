/**
 * components/footer.js
 * Meng-inject HTML footer ke semua halaman.
 * Gunakan <div id="footer-placeholder"></div> di HTML.
 */
(function () {
  const BASE = window.BASE_PATH || '../../../';

  const MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.28400289578!2d112.6069557!3d-7.2261326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7801b9603aa555%3A0x7cb790ef57e23165!2sPusat%20Terapi%20Autis%2FAnak%20Berkebutuhan%20Khusus%20ACT(%20Autistic%20Children's%20Therapy)%2FYayasan%20PAIS!5e1!3m2!1sid!2sid!4v1749135825834!5m2!1sid!2sid`;

  const footerHTML = `
    <!-- Floating Social Media -->
    <div class="menu_sosial">
      <a href="https://api.whatsapp.com/send/?phone=6285731151648&text&type=phone_number&app_absent=0" class="icon_sosial whatsapp">
        <img src="${BASE}public/images/whatsapp logo.png" alt="WhatsApp">
      </a>
      <a href="https://web.facebook.com/act.abk?mibextid=ZbWKwL&_rdc=1&_rdr#" class="icon_sosial facebook">
        <img src="${BASE}public/images/facebook logo.png" alt="Facebook">
      </a>
      <a href="https://www.instagram.com/act_terapiabksurabaya/" class="icon_sosial instagram">
        <img src="${BASE}public/images/instagram logo.png" alt="Instagram">
      </a>
      <a href="https://www.youtube.com/@terapiautisact6504" class="icon_sosial youtube">
        <img src="${BASE}public/images/youtube logo.png" alt="YouTube">
      </a>
    </div>

    <footer>
      <div class="footer-content">
        <!-- Kolom 1: Jam Kerja -->
        <div class="footer-column">
          <h3>Jam Kerja</h3>
          <p>Senin - Jumat: 08.00 - 16.00</p>
          <p>Sabtu: 08.00 - 12.00</p>
          <p>Minggu &amp; Libur: Tutup</p>
        </div>

        <!-- Kolom 2: Lokasi / Maps -->
        <div class="footer-column">
          <h3>Lokasi</h3>
          <a href="https://maps.app.goo.gl/xReAWSXNdFruMSpG9" target="_blank">
            <iframe
              src="${MAPS_EMBED}"
              width="250" height="150"
              style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </a>
        </div>

        <!-- Kolom 3: Kontak -->
        <div class="footer-column">
          <h3>Hubungi Kami</h3>
          <p>act_abk@yahoo.com</p>
        </div>

        <!-- Kolom 4: Sosial Media -->
        <div class="menu_sosial_footer_inline">
          <div class="follow_sosmed">
            <h3>Sosial Media</h3>
          </div>
          <div class="menu_sosial_footer_inline_flex">
            <div class="icon_sosial_footer whatsapp">
              <a href="https://api.whatsapp.com/send/?phone=6285731151648&text&type=phone_number&app_absent=0">
                <img src="${BASE}public/images/whatsapp logo.png" alt="WhatsApp">
              </a>
            </div>
            <div class="icon_sosial_footer facebook">
              <a href="https://web.facebook.com/act.abk?mibextid=ZbWKwL&_rdc=1&_rdr#">
                <img src="${BASE}public/images/facebook logo.png" alt="Facebook">
              </a>
            </div>
            <div class="icon_sosial_footer instagram">
              <a href="https://www.instagram.com/act_terapiabksurabaya/">
                <img src="${BASE}public/images/instagram logo.png" alt="Instagram">
              </a>
            </div>
            <div class="icon_sosial_footer youtube">
              <a href="https://www.youtube.com/@terapiautisact6504">
                <img src="${BASE}public/images/youtube logo.png" alt="YouTube">
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-text-center">
        <p>&copy; 2025 ACT - Hak cipta dilindungi oleh undang-undang</p>
      </div>
    </footer>
  `;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = footerHTML;
  }
})();
