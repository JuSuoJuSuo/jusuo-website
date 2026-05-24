import re, os, glob

def get_color(alt, src):
    alt_lower = alt.lower()
    src_lower = src.lower()
    if 'before' in alt_lower or '改造前' in alt_lower:
        return '#C4B5A5', '#6B5B4E', '改造前'
    if 'after' in alt_lower or '改造後' in alt_lower:
        return '#7A9E7E', '#ffffff', '改造後'
    if 'sean' in alt_lower or '劉冠炫' in alt_lower or 'facearea' in src_lower:
        return '#B8A898', '#ffffff', '創辦人照片'
    if '1600' in src or '台北公寓' in alt_lower:
        return '#8B6B4A', '#ffffff', alt if alt else 'Hero 大圖'
    if '隔套' in alt_lower:
        return '#C9A96E', '#ffffff', '隔套裝修示意'
    if '老屋' in alt_lower:
        return '#A0896E', '#ffffff', '老屋改造示意'
    if '軟裝' in alt_lower:
        return '#B5C4B1', '#2D2620', '軟裝設計示意'
    if '改造' in alt_lower or 'renovation' in src_lower:
        return '#A0896E', '#ffffff', alt if alt else '改造圖片'
    if '商業' in alt_lower or '工作坊' in alt_lower or '拍攝' in alt_lower or '展覽' in alt_lower:
        return '#8B9E8B', '#ffffff', alt if alt else '空間照片'
    if '投資' in alt_lower or '國內' in alt_lower or '海外' in alt_lower:
        return '#7A9E7E', '#ffffff', alt if alt else '投資圖片'
    if '品牌' in alt_lower or '故事' in alt_lower:
        return '#C9A96E', '#ffffff', alt if alt else '品牌照片'
    if '套房' in alt_lower or '公寓' in alt_lower or '一房' in alt_lower or '兩房' in alt_lower:
        return '#D4C4B5', '#6B5B4E', alt if alt else '房源圖片'
    return '#D0C8C0', '#6B5B4E', alt if alt else '圖片'

def replace_img_tag(match):
    full_tag = match.group(0)
    src_match = re.search(r'src=["\']([^"\']+)["\']', full_tag)
    src = src_match.group(1) if src_match else ''
    if 'unsplash' not in src:
        return full_tag
    alt_match = re.search(r'alt=["\']([^"\']*)["\']', full_tag)
    alt = alt_match.group(1) if alt_match else ''
    class_match = re.search(r'class=["\']([^"\']*)["\']', full_tag)
    classes = class_match.group(1) if class_match else 'w-full h-full'
    classes = classes.replace('object-cover', '').replace('hover:scale-105', '').replace('transition-transform duration-500', '').strip()
    style_match = re.search(r'style=["\']([^"\']*)["\']', full_tag)
    style = style_match.group(1) if style_match else ''
    bg, fg, label = get_color(alt, src)
    div = f'<div class="{classes} flex items-center justify-center font-medium text-sm" style="background:{bg}; color:{fg}; {style}">{label}</div>'
    return div

html_files = glob.glob('/Users/liuguanxuan/Downloads/Sean-agent/jusuo-website/*.html')

for filepath in sorted(html_files):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    content = re.sub(r'<img\s[^>]+>', replace_img_tag, content, flags=re.DOTALL)
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✅ 已處理：{os.path.basename(filepath)}')
    else:
        print(f'⏭️  無變更：{os.path.basename(filepath)}')

print('\n完成！')
