
<todo>
    
    <div class="uk-width-1-3 uk-container uk-container-center">
    <h1 class="uk-heading-large">{ opts.title }</h1>
    
    <ul class="uk-list uk-list-striped">
        <li each={ items }>
        <label class={ uk-text-muted: done}>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }>{ title }
        </label>
        </li>
    </ul>
    
    <form class="uk-form" onsubmit={ add }>
        <input ref="input" onkeyup={ edit }>
        <button class={ uk-button:true } disabled={ !text }>Add</button>
        
        <button disabled={ items.filter(only).length == 0 } onclick={ clear } class={ uk-button-primary: items.filter(only).length != 0, uk-button: true }>
        Clear({ items.filter(only).length })</button>
    </form>
    </div>

    <script>
    var self = this
    self.items = opts.items
    
    add(e) {
        if (this.text) {
            let item = {
                title: this.refs.input.value,
                done: false
            }
            self.items.push(item)
            this.text = this.refs.input.value = ""
            opts.api.post(item)
        }
        e.preventDefault()
    }
    
    edit(e) {
        this.text = e.target.value
    }
    
    toggle(e) {
        let item = e.item
        item.done = !item.done
        return true
    }
    
    clear(e) {
        let items = self.items.filter(function(item) { return item.done })
        self.items = self.items.filter(function(item) {
            return !item.done
        })
        
        for (let item of items) {
            opts.api.patch(item)
        }
        e.preventDefault()
    }
    
    only(item) {
        return item.done
    }
    </script>
</todo>
