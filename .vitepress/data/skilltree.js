export const SKILL_NODES = {
  "mem_skill_soul_fire_1": {
    "id": "mem_skill_soul_fire_1",
    "x": -103,
    "y": 115,
    "connects": [
      "mem_skill_soul_fire_2"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_FIRE_1",
    "title": "灵魂实体专精一级",
    "desc": "你发射的[鬼火]首次命中后可额外弹射10次；\n每次弹射使下一次飞行速度和索敌范围按初始值+10%；\n[鬼火]引爆[魂魄刻印]后，给自身添加同等层数的[闪耀刻印]，持续10秒。",
    "icon": "mem_skill_soul_fire_1"
  },
  "mem_skill_soul_fire_2": {
    "id": "mem_skill_soul_fire_2",
    "x": -103,
    "y": 62,
    "connects": [
      "mem_skill_soul_fire_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_FIRE_2",
    "title": "灵魂实体专精二级",
    "desc": "跟随你的[友善的荒尹沐]发射的[鬼火]弹射次数+5（5→10，不含首次命中）；\n跟随你的[友善的芒伊月]每颗[鬼火]伤害+67%。\n[闪耀刻印]的闪避为基础效果，无需学习本技能：每层5%，最高50%，成功闪避后层数减半。",
    "icon": "mem_skill_soul_fire_2"
  },
  "mem_skill_soul_fire_3": {
    "id": "mem_skill_soul_fire_3",
    "x": -103,
    "y": 10,
    "connects": [
      "mem_skill_soul_lock_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_FIRE_3",
    "title": "灵魂实体专精三级",
    "desc": "[闪耀刻印]自然结束或层数溢出时，按结算层数返还附加[魂魄刻印]所消耗的[灵魂值]；\n结算层数≥5/10时，额外恢复最大[灵魂值]的5%/10%；无灵魂值系统的目标改为恢复少量生命值。\n分身的恢复效果反馈到玩家。",
    "icon": "mem_skill_soul_fire_3"
  },
  "mem_skill_soul_hand": {
    "id": "mem_skill_soul_hand",
    "x": -153,
    "y": 62,
    "connects": [
      "mem_skill_soul_melt"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_HAND",
    "title": "顷刻炼化",
    "desc": "空手命中敌人时，恢复造成伤害3%的[灵魂值]。\n对墙、发条生物等无灵魂单位无效。",
    "icon": "mem_skill_soul_hand"
  },
  "mem_skill_soul_melt": {
    "id": "mem_skill_soul_melt",
    "x": -153,
    "y": 10,
    "connects": [
      "mem_skill_soul_lock_1"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_MELT",
    "title": "融魂术",
    "desc": "击杀最大生命值大于150、具有灵魂的目标时，恢复目标最大生命值3%的[灵魂值]。\n对墙、发条生物等无灵魂单位无效。",
    "icon": "mem_skill_soul_melt"
  },
  "mem_skill_soul_rest_1": {
    "id": "mem_skill_soul_rest_1",
    "x": -51,
    "y": 62,
    "connects": [
      "mem_skill_soul_rest_2"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_REST_1",
    "title": "休养死息一级",
    "desc": "溢出治疗、脱战时灵魂转生命、死亡时剩余生命转灵魂的转换率由30%提升至50%；\n制作栏生命/灵魂兑换消耗20点，产出9点（另损失10%转换收益）。",
    "icon": "mem_skill_soul_rest_1"
  },
  "mem_skill_soul_rest_2": {
    "id": "mem_skill_soul_rest_2",
    "x": -51,
    "y": 10,
    "connects": [
      "mem_skill_soul_lock_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_REST_2",
    "title": "休养死息二级",
    "desc": "溢出治疗、脱战时灵魂转生命、死亡时剩余生命转灵魂的转换率提升至70%；\n制作栏生命/灵魂兑换消耗20点，产出12.6点（另损失10%转换收益）。",
    "icon": "mem_skill_soul_rest_2"
  },
  "mem_skill_soul_lock_1": {
    "id": "mem_skill_soul_lock_1",
    "x": -153,
    "y": -34,
    "connects": [
      "mem_skill_soul_light"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_SOUL_LOCK_1",
    "title": "路径锁定",
    "desc": "前置要求：点亮[融魂术]\n【封印】你需要在黑暗中倾听危险的警告，逃回光照以积攒胆识。\n越是极限收益越高，未达标时被夜袭击中，会失去95%的已有进度。",
    "icon": "mem_skill_soul_lock_1"
  },
  "mem_skill_soul_light": {
    "id": "mem_skill_soul_light",
    "x": -154,
    "y": -79,
    "connects": [],
    "locks": [
      "mem_skill_soul_lock_1"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_LIGHT",
    "title": "彼世的光芒",
    "desc": "学习并生效后完全闪避查理夜袭，每次成功闪避获得1层[闪耀刻印]；\n由你或随从产生的[鬼火]、[魂魄刻印]提供照明；\n受击时随机获得1～5层[闪耀刻印]，持有任意层数时有发光鬼火附身；\n通过[闪耀刻印]成功闪避时，消耗的层数会转为攻击者身上的[魂魄刻印]，同样作用于[分头行动]/[意识转移]产生的分身。",
    "icon": "mem_skill_soul_light"
  },
  "mem_skill_soul_lock_3": {
    "id": "mem_skill_soul_lock_3",
    "x": -102,
    "y": -34,
    "connects": [
      "mem_skill_soul_split"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_SOUL_LOCK_3",
    "title": "路径锁定",
    "desc": "前置要求：点亮[融魂术]、[灵魂实体专精三级]、[休养死息二级]中的任意两个\n【封印】你需要通过大量治疗溢出，让[灵魂池]在某一刻≥150点。",
    "icon": "mem_skill_soul_lock_3"
  },
  "mem_skill_soul_split": {
    "id": "mem_skill_soul_split",
    "x": -102,
    "y": -79,
    "connects": [],
    "locks": [
      "mem_skill_soul_lock_3"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_SPLIT",
    "title": "四象离魂",
    "desc": "按G（默认）使自身环绕4颗可索敌的[鬼火]；开启需至少5点[灵魂值]，启动消耗1点，默认此后每秒消耗0.5点；\n每次碰撞默认额外消耗0.5点灵魂，两项消耗均可在模组设置调整；默认造成10点伤害和10%减速（可叠4次）；\n[分头行动]/[意识转移]时身体与头部各环绕4颗，伤害和碰撞耗魂各减半，每秒耗魂不增加。",
    "icon": "mem_skill_soul_split"
  },
  "mem_skill_soul_lock_2": {
    "id": "mem_skill_soul_lock_2",
    "x": -51,
    "y": -34,
    "connects": [
      "mem_skill_soul_wall"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_SOUL_LOCK_2",
    "title": "路径锁定",
    "desc": "前置要求：点亮[休养死息二级]\n【封印】你需要承受一次幅度≥101%的[灵魂震荡]。\n只有让躯壳彻底体验过灵魂撕裂的痛苦，你才能学会如何构筑壁垒。",
    "icon": "mem_skill_soul_lock_2"
  },
  "mem_skill_soul_wall": {
    "id": "mem_skill_soul_wall",
    "x": -51,
    "y": -79,
    "connects": [],
    "locks": [
      "mem_skill_soul_lock_2"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_WALL",
    "title": "魂墙",
    "desc": "免疫[灵魂裂痕]；[灵魂震荡]恢复速率+100%，不再免疫震荡；\n免疫[怨灵]/[意识转移]产生的[暗影观察者]；\n可消耗1点[灵魂值]制造脆弱但能挡路的[魂墙(物品)]。",
    "icon": "mem_skill_soul_wall"
  },
  "mem_skill_instinct_teleport": {
    "id": "mem_skill_instinct_teleport",
    "x": 2,
    "y": -79,
    "connects": [],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_TELEPORT",
    "title": "落叶归根",
    "desc": "从[芒芒的坟墓]复活不再破坏坟墓，改为1天冷却；\n在[狐狸的凶宅]休息时正常恢复理智；\n从[芒芒的尸体]复活会留下一朵一次性传送锚点[归途之花]，生成冷却1天。\n鬼魂地图传送已是基础能力；本技能不再免疫[灵魂裂痕]。",
    "icon": "mem_skill_instinct_teleport"
  },
  "mem_skill_body_lock_spirit": {
    "id": "mem_skill_body_lock_spirit",
    "x": 0,
    "y": 0,
    "connects": [
      "mem_spirit_link"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_SPIRIT",
    "title": "路径锁定",
    "desc": "前置要求：点亮[休养死息二级]、[精准度优化一级]、[参点防腐剂一级]、[逐渐麻木一级]中的任意两个\n【封印】你需要在5秒内失去等同于你“当前”灵魂上限的灵魂值。\n体验濒临枯竭的绝境来激发潜能，或许……主动压低上限也是一种捷径？",
    "icon": "mem_skill_body_lock_spirit"
  },
  "mem_spirit_link": {
    "id": "mem_spirit_link",
    "x": 0,
    "y": 77,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_spirit"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SPIRIT_LINK",
    "title": "魂魄逸散",
    "desc": "可以对自己执行特殊的[分头行动]：[意识转移]。\n[分头行动]下的身体受击后 1 秒内，后续受到的伤害 -80%（首次受击不减伤）。\n累计损失 30 点[灵魂值]后，下一次攻击命中主目标时发射一颗[鬼火]。",
    "icon": "mem_spirit_link"
  },
  "mem_skill_body_precision_1": {
    "id": "mem_skill_body_precision_1",
    "x": 52,
    "y": 77,
    "connects": [
      "mem_skill_body_precision_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRECISION_1",
    "title": "精准度“优化”一级",
    "desc": "[兽化状态]下，你的采集、收获速度+20%；\n但爪子不适合精细工作，制作速度-10%；\n兽化空手基础伤害累计+5%",
    "icon": "mem_skill_body_precision_1"
  },
  "mem_skill_body_precision_2": {
    "id": "mem_skill_body_precision_2",
    "x": 100,
    "y": 77,
    "connects": [
      "mem_skill_body_precision_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRECISION_2",
    "title": "精准度“优化”二级",
    "desc": "[兽化状态]下，你的采集、收获速度+40%；\n制作速度-20%；\n兽化空手基础伤害累计+10%",
    "icon": "mem_skill_body_precision_2"
  },
  "mem_skill_body_precision_3": {
    "id": "mem_skill_body_precision_3",
    "x": 148,
    "y": 77,
    "connects": [
      "mem_skill_instinct_beastly"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRECISION_3",
    "title": "精准度“优化”三级",
    "desc": "[兽化状态]下，你的采集、收获速度+60%；\n制作速度-30%；\n兽化空手基础伤害累计+15%",
    "icon": "mem_skill_body_precision_3"
  },
  "mem_skill_body_preservative_1": {
    "id": "mem_skill_body_preservative_1",
    "x": 52,
    "y": 17,
    "connects": [
      "mem_skill_body_preservative_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRESERVATIVE_1",
    "title": "参点防腐剂一级",
    "desc": "随身物品腐烂速率降至通常的90%，与保鲜容器原有效果乘算，也作用于挖掘的藏食物坑洞；\n[芒芒的尸体]在普通地面条件下的腐烂时间延长至约7天（受环境影响）。",
    "icon": "mem_skill_body_preservative_1"
  },
  "mem_skill_body_preservative_2": {
    "id": "mem_skill_body_preservative_2",
    "x": 100,
    "y": 17,
    "connects": [
      "mem_skill_body_preservative_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRESERVATIVE_2",
    "title": "参点防腐剂二级",
    "desc": "随身物品腐烂速率降至通常的80%，与保鲜容器原有效果乘算，也作用于挖掘的藏食物坑洞；\n[芒芒的尸体]在普通地面条件下的腐烂时间延长至约14天（受环境影响）。",
    "icon": "mem_skill_body_preservative_2"
  },
  "mem_skill_body_preservative_3": {
    "id": "mem_skill_body_preservative_3",
    "x": 148,
    "y": 17,
    "connects": [
      "mem_skill_instinct_ghostly"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRESERVATIVE_3",
    "title": "参点防腐剂三级",
    "desc": "随身物品腐烂速率降至通常的70%，与保鲜容器原有效果乘算，也作用于挖掘的藏食物坑洞；\n[芒芒的尸体]在普通地面条件下的腐烂时间延长至约20天（受环境影响）。",
    "icon": "mem_skill_body_preservative_3"
  },
  "mem_skill_body_numb_1": {
    "id": "mem_skill_body_numb_1",
    "x": 52,
    "y": -47,
    "connects": [
      "mem_skill_body_numb_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_NUMB_1",
    "title": "逐渐麻木一级",
    "desc": "你受到的所有持续性理智波动（包含环境与光环）降低 15%；\n你处于[怨灵状态]因理智值影响的最高攻击与承伤倍率提升至 1.65 倍",
    "icon": "mem_skill_body_numb_1"
  },
  "mem_skill_body_numb_2": {
    "id": "mem_skill_body_numb_2",
    "x": 100,
    "y": -47,
    "connects": [
      "mem_skill_body_numb_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_NUMB_2",
    "title": "逐渐麻木二级",
    "desc": "你受到的所有持续性理智波动（包含环境与光环）降低 30%；\n你处于[怨灵状态]因理智值影响的最高攻击与承伤倍率提升至 1.8 倍",
    "icon": "mem_skill_body_numb_2"
  },
  "mem_skill_body_numb_3": {
    "id": "mem_skill_body_numb_3",
    "x": 146,
    "y": -47,
    "connects": [
      "mem_skill_instinct_ghostly"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_NUMB_3",
    "title": "逐渐麻木三级",
    "desc": "你受到的所有持续性理智波动（包含环境与光环）降低 45%；\n你处于[怨灵状态]因理智值影响的最高攻击与承伤倍率提升至 1.95 倍",
    "icon": "mem_skill_body_numb_3"
  },
  "mem_skill_instinct_beastly": {
    "id": "mem_skill_instinct_beastly",
    "x": 196,
    "y": 37,
    "connects": [
      "mem_skill_body_lock_exp"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_BEASTLY",
    "title": "野兽体质",
    "desc": "[兽化]时可空手工作（但效率仅有40%且工作时肚子会饿）；\n处于[兽化]且[分头行动]时可以指挥身体工作；\n[兽化]跳跃滞空时间缩短40%；\n藏食物时刨的土坑的可维持的时间翻倍",
    "icon": "mem_skill_instinct_beastly"
  },
  "mem_skill_instinct_ghostly": {
    "id": "mem_skill_instinct_ghostly",
    "x": 196,
    "y": -14,
    "connects": [
      "mem_skill_body_lock_exp"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_GHOSTLY",
    "title": "幽灵体质",
    "desc": "降低远处敌人的察觉范围，[分头行动]时效果更强；\n分头时可让附近正以你为目标的恐惧类、梦魇类影怪失去仇恨；接头时也可对附近符合条件的影怪造成恐慌；\n击杀恐惧类影怪额外获得50%的理智恢复。",
    "icon": "mem_skill_instinct_ghostly"
  },
  "mem_skill_body_lock_exp": {
    "id": "mem_skill_body_lock_exp",
    "x": 194,
    "y": -53,
    "connects": [
      "mem_explosive_body"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_EXP",
    "title": "路径锁定",
    "desc": "前置要求：同时拥有[幽灵体质]与[野兽体质]\n【封印】你需要切身体验一次粉身碎骨的瞬间（因爆炸而死亡1次）。\n唯有直面毁灭的冲击，这具躯壳才能学会如何将残存的能量化作绚丽的余烬。",
    "icon": "mem_skill_body_lock_exp"
  },
  "mem_explosive_body": {
    "id": "mem_explosive_body",
    "x": 196,
    "y": -90,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_exp"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_EXPLOSIVE_BODY",
    "title": "易燃易爆",
    "desc": "[芒芒的尸体]可引爆，[芒芒的肢体]可投掷爆炸。\n每次肢体爆炸有25%概率返还小肉；四组基础技能每个等级+5个百分点，最高85%。\n完整尸体进行6次独立返肉判定，另有25%概率返还骨片；小肉新鲜度随机10%～33%。",
    "icon": "mem_explosive_body"
  },
  "mem_skill_body_medicine": {
    "id": "mem_skill_body_medicine",
    "x": 251,
    "y": 113,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_medicine"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_MEDICINE",
    "title": "本源协调",
    "desc": "你和[友善的荒尹沐]的[鬼火]如果有弹射次数，那么将可以在友军和玩家之间弹射（不造成伤害）；\n[友善的芒伊月]的[近战模式]攻击后虚弱时间 -2 秒；同时，你的随从不再会因为阵营对立而互相攻击；\n你可以食用绝望石或者纯粹辉煌来让你和你的随从加入对应阵营8分钟，\n以换取对同阵营的20%伤害减免和对敌对阵营的20%伤害增加",
    "icon": "mem_skill_body_medicine"
  },
  "mem_skill_body_lock_medicine": {
    "id": "mem_skill_body_lock_medicine",
    "x": 251,
    "y": 73,
    "connects": [
      "mem_skill_body_medicine"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_MEDICINE",
    "title": "路径锁定",
    "desc": "前置要求：点亮[隐藏本能二级]\n【封印】让10种不同的生灵折服于你并奉你为主。\n唯有深刻体悟不同躯壳的差异与共性，才能随心所欲地调配它们的本源。",
    "icon": "mem_skill_body_lock_medicine"
  },
  "mem_skill_instinct_hide_2": {
    "id": "mem_skill_instinct_hide_2",
    "x": 251,
    "y": 35,
    "connects": [
      "mem_skill_body_lock_medicine"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_HIDE_2",
    "title": "隐藏本能二级",
    "desc": "兽化下不会惊扰小动物；\n捕猎成功率累计+20个百分点，捕猎姿态移速累计+40%；\n姿态下从目标背后捕猎，成功率另+30个百分点；未锁定你的普通敌人索敌时忽视你的概率为60%。\n姿态下跳跃后，自动对周围最近的可捕获目标发起一次捕获。",
    "icon": "mem_skill_instinct_hide_2"
  },
  "mem_skill_instinct_hide_1": {
    "id": "mem_skill_instinct_hide_1",
    "x": 251,
    "y": -16,
    "connects": [
      "mem_skill_instinct_hide_2",
      "mem_skill_body_lock_corpse"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_HIDE_1",
    "title": "隐藏本能一级",
    "desc": "兽化下不再被猪人等中立生物敌视；\n捕猎成功率累计+10个百分点，捕猎姿态移速累计+20%；\n姿态下从目标背后捕猎，成功率另+30个百分点；未锁定你的普通敌人索敌时忽视你的概率为50%。",
    "icon": "mem_skill_instinct_hide_1"
  },
  "mem_skill_body_lock_corpse": {
    "id": "mem_skill_body_lock_corpse",
    "x": 251,
    "y": -55,
    "connects": [
      "mem_corpse_mastery"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_CORPSE",
    "title": "路径锁定",
    "desc": "前置要求：学习[幽灵体质]，并在[参点防腐剂三级]、[野兽体质]中任选一个\n【封印】亲手缝制66种不同的随身装备，或击杀6种符合条件的月亮变异生物、友善随从或暗影寄生复生生物。\n借由不断编织外物与剖析复生者的躯壳，你终将参透重塑死体的奥秘。",
    "icon": "mem_skill_body_lock_corpse"
  },
  "mem_corpse_mastery": {
    "id": "mem_corpse_mastery",
    "x": 251,
    "y": -92,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_corpse"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_CORPSE_MASTERY",
    "title": "死体精通",
    "desc": "你可以给尸体复活而来的随从穿戴改变定位的[战术装备]了；\n你可以对坟墓或尸体、尸体复活而来的随从进行防腐改造了；\n防腐改造后撒盐能让它们存在的更久，获得的治疗效果更好",
    "icon": "mem_corpse_mastery"
  }
};
