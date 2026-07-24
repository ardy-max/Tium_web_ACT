import os
import glob

admin_dir = r"c:\xampp\htdocs\Tium_web_ACT\app\views\admin"
php_files = glob.glob(os.path.join(admin_dir, "*.php"))

for file_path in php_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    changed = False
    
    if "Kelola User" not in content:
        sidebar_addition = """
          <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
          <li><a href="./users.php">👥 Kelola User</a></li>
          <?php endif; ?>"""
        content = content.replace("</ul>\n      </nav>", sidebar_addition + "\n        </ul>\n      </nav>")
        changed = True
        
    if "Welcome, <strong>Admin</strong>" in content:
        content = content.replace("<span>Welcome, <strong>Admin</strong></span>", "<span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['nama'] ?? 'User'); ?></strong></span>")
        changed = True
        
    if changed:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

print("sidebar updated")
