'use strict';

const up = [768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 794, 795, 829, 830, 831, 832, 833, 834, 835, 836, 838, 842, 843, 844, 848, 849, 850, 855, 856, 859, 861, 862, 864, 865, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879];
const middle = [820, 821, 822, 823, 824];
const down = [790, 791, 792, 793, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 825, 826, 827, 828, 837, 839, 840, 841, 845, 846, 851, 852, 853, 854, 857, 858, 860, 863, 866,];

const zalgo = {
  command: '!zalgo',
  args: [{ name: 'text', required: true, rest: true }],
  help: 'He comes.',
  async run([...text], { rtm, channel }) {
    if (text.length < 1) {
      return;
    }

    await rtm.sendMessage(heComes(text.join(' ')), channel);
  },
};

const heComes = text => {
  return text.replace(/:[1-9A-Za-z_-]+:|[1-9A-Za-z-]/g, char => {
    if (char.length > 1) {
      return char;
    }

    const base = [
      up, up, up, up, up, up, up, up, up, up, up,
      middle, middle, middle, middle, middle,
      down, down, down, down, down, down, down, down, down, down, down, down,
    ];

    for (let i = base.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }

    let fuck = '';

    for (let i = Math.floor(Math.random() * 20); i >= 0; i -= 1) {
      fuck += String.fromCharCode(base[i][Math.floor(Math.random() * base[i].length)]);
    }

    return `${char}${fuck}`;
  });
};

module.exports = zalgo;
