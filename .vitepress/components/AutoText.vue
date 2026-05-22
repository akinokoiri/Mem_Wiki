<script>
import { h, defineComponent } from 'vue';
import DST from '../theme/components/DST.vue';
import { nounMap } from '../theme/components/icons.js';

export default defineComponent({
  name: 'AutoText',
  props: {
    text: { type: String, required: true }
  },
  setup(props) {
    const parseInline = (str) => {
      // 匹配 **加粗** 或 [名词] 或 <strong>加粗</strong> 或 <b>加粗</b> 或 <br> 换行
      const tokenRegex = /(\*\*.*?\*\*|\[.*?\]|<strong>.*?<\/strong>|<b>.*?<\/b>|<br\s*\/?>|\n)/ig;
      const parts = str.split(tokenRegex);
      
      return parts.map(part => {
        if (!part) return null;
        
        // 匹配 **加粗**
        if (part.startsWith('**') && part.endsWith('**')) {
          return h('strong', null, parseInline(part.slice(2, -2)));
        }
        // 匹配 <strong>加粗</strong>
        if (/^<strong>.*<\/strong>$/i.test(part)) {
          return h('strong', null, parseInline(part.replace(/^<strong>|<\/strong>$/ig, '')));
        }
        // 匹配 <b>加粗</b>
        if (/^<b>.*<\/b>$/i.test(part)) {
          return h('strong', null, parseInline(part.replace(/^<b>|<\/b>$/ig, '')));
        }
        // 匹配 [名词]
        if (part.startsWith('[') && part.endsWith(']')) {
          const noun = part.slice(1, -1).trim();
          const lowerNoun = noun.toLowerCase();
          const key = nounMap[lowerNoun] || nounMap[noun] || 'mod';
          return h(DST, { icon: key }, () => noun);
        }
        // 匹配 <br> 或 换行符
        if (/^<br\s*\/?>$/i.test(part) || part === '\n') {
          return h('br');
        }
        
        // 纯文本
        return part;
      }).filter(Boolean);
    };

    return () => h('span', null, parseInline(props.text));
  }
});
</script>
