import { Group, Label } from 'spritejs'
import { BasePlugin } from '../core'

export class Text extends BasePlugin {
  getDefaultAttrs() {
    return {
      anchor: [0.5, 0.5],
      textAlign: 'right'
    }
  }

  render() {
    return (
      <Group>
        <Label
          textAlign={this.attr('textAlign')}
          text={this.attr('text')}
          anchor={this.attr('anchor')}
          color={'black'}
        />
      </Group>
    )
  }
}
